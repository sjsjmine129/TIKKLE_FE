import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default Bubble = ({width, height, stroke, strokeWidth, scale}) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.41016 22C3.41016 18.13 7.26016 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37M12.0002 12C13.3262 12 14.598 11.4732 15.5357 10.5355C16.4734 9.59785 17.0002 8.32608 17.0002 7C17.0002 5.67392 16.4734 4.40215 15.5357 3.46447C14.598 2.52678 13.3262 2 12.0002 2C10.6741 2 9.4023 2.52678 8.46462 3.46447C7.52694 4.40215 7.00016 5.67392 7.00016 7C7.00016 8.32608 7.52694 9.59785 8.46462 10.5355C9.4023 11.4732 10.6741 12 12.0002 12Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
        <Path
          d="M19.49 17.98H16.51M18 16.52V19.51M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C21.0675 20.6525 20.5667 21.143 19.967 21.4831C19.3674 21.8233 18.6894 22.0014 18 22C17.0155 22.0029 16.0659 21.6352 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.1993 19.4404 13.9985 18.7272 14 18C13.9994 17.4745 14.1024 16.9541 14.3031 16.4685C14.5039 15.9829 14.7985 15.5417 15.1701 15.1701C15.5417 14.7985 15.9829 14.5039 16.4685 14.3031C16.9541 14.1024 17.4745 13.9993 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          scale={scale}
        />
      </Svg>
    </View>
  );
};
