import {AbstractControl, ValidatorFn} from '@angular/forms';
import StringUtils from '../string-utils';

export function codeValidator(minAngle: Number = -165,
                              maxAngle: Number = 165,
                              maxTotalLength: Number = 1200): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let code = control.value;

    if (!code.startsWith('AQW#')) {
      return {
        codeStartsWithAQWHash: {
          parsedCode: code,
        },
      };
    }

    if (!code.endsWith('#')) {
      return {
        codeEndsWithHash: {
          parsedCode: code,
        },
      };
    }

    if (StringUtils.countCharacter('#', code) !== 2) {
      return {
        codeHasTwoDelimitingHashes: {
          parsedCode: code,
        },
      };
    }

    // This matcher pattern matches any number of substrings starting with @
    // and ending with @ or # (ending character not included in the substring)
    let segments = code.match(/@.+?(?=[@|#])/g);

    if (segments === null || segments.length < 1) {
      return {
        codeHasValidSegments: {
          parsedCode: code,
        },
      };
    }

    let totalSegmentsLength = 0;
    let validatedSegments = [];
    for (let segment of segments) {
      // Remove starting @ and split by L
      let segmentInfo = segment.substring(1).split('L');

      if (segmentInfo.length !== 2) {
        // This segment has no information regarding its angle or its length
        return {
          segmentHasAngleAndLength: {
            parsedCode: code,
            parsedSegment: segment,
          },
        };
      }

      if (!StringUtils.stringIsAnInteger(segmentInfo[0])) {
        // This segment angle is not an integer
        return {
          segmentHasIntegerAngle: {
            parsedCode: code,
            parsedSegment: segment,
          },
        };
      }

      let segmentAngle = parseInt(segmentInfo[0], 10); // sexagesimal degrees
      if (segmentAngle < minAngle || segmentAngle > maxAngle) {
        // Segment angle must be between minAngle and maxAngle
        return {
          segmentAngleIsWithinLimits: {
            parsedCode: code,
            parsedSegment: segment,
          },
        };
      }

      if (!StringUtils.stringIsAnInteger(segmentInfo[1])) {
        // This segment length is not an integer
        return {
          segmentHasIntegerLength: {
            parsedCode: code,
            parsedSegment: segment,
          },
        };
      }

      let segmentLength = parseInt(segmentInfo[1], 10); // cm
      if (segmentLength < 1) {
        // Segment length must be a positive integer
        return {
          segmentLengthIsAPositiveInteger: {
            parsedCode: code,
            parsedSegment: segment,
          },
        };
      }
      totalSegmentsLength += segmentLength;
      validatedSegments.push([segmentAngle, segmentLength]);
    }

    if (totalSegmentsLength >= maxTotalLength) {
      // The sum of all segments length must be less than maxTotalLength (cm)
      return {
        segmentLengthIsAPositiveInteger: {
          parsedCode: code
        },
      };
    }

    // Validation passed.
    return null;
  };
}
