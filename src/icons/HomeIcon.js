import React from 'react';
import { View } from 'react-native';
import Svg, { 
  Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg';

const HomeIcon = ({ color }) => {
  console.log(color);
  return (
    <View>
      <Svg width="20" height="20" viewBox="0 0 480 449" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd" clip-rule="evenodd" d="M400 140.626L475.064 212.481C481.447 218.592 481.669 228.72 475.558 235.103C469.448 241.486 459.319 241.708 452.936 235.597L432 215.556V416.039C432 424.526 428.629 432.665 422.627 438.667C416.626 444.668 408.487 448.039 400 448.039H304C295.163 448.039 288 440.876 288 432.039V296.039C288 293.917 287.157 291.883 285.657 290.382C284.157 288.882 282.122 288.039 280 288.039H200C197.878 288.039 195.843 288.882 194.343 290.382C192.843 291.883 192 293.917 192 296.039V432.039C192 440.876 184.837 448.039 176 448.039H80C71.5131 448.039 63.3738 444.668 57.3726 438.667C51.3714 432.665 48 424.526 48 416.039V215.556L27.064 235.597C20.6807 241.708 10.5524 241.486 4.44197 235.103C-1.66849 228.72 -1.44728 218.592 4.93605 212.481L217.842 8.67641C224.369 2.05949 233.263 0.0445076 240.062 0.0566955C246.834 0.0688348 255.697 2.10034 262.172 8.68957L320 64.0458V32.0391C320 23.2025 327.163 16.0391 336 16.0391H384C392.837 16.0391 400 23.2025 400 32.0391V140.626ZM368 109.994V48.0391H352V94.6779L368 109.994ZM240.321 32.0706L400 184.924V416.039H320V296.039C320 285.43 315.786 275.256 308.284 267.755C300.783 260.253 290.609 256.039 280 256.039H200C189.391 256.039 179.217 260.253 171.716 267.755C164.214 275.256 160 285.43 160 296.039V416.039H80V184.924L239.68 32.0703C239.78 32.0616 239.889 32.0564 240.005 32.0566C240.117 32.0568 240.223 32.062 240.321 32.0706Z" fill={`${color}`}
        />
      </Svg>
    </View>
  );
};

export {
  HomeIcon
};