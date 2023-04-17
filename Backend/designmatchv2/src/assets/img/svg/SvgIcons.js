import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Svg = styled(Icon)` 
  width: 99px; 
  height: 99px;

`

export const xIcon = ({ className }) => ( 
    <Svg viewBox="0 0 99 99" className={className}>   
      <path
        fill="currentColor"
        d="
    M77.342865,28.842991 
	C79.416252,30.498247 79.532654,31.642897 77.677986,33.388149 
	C71.990875,38.739780 66.518623,44.319733 60.907112,49.865978 
	C67.518028,56.325291 73.882011,62.543327 80.496109,69.005745 
	C76.291634,72.807961 72.747902,76.012642 69.323639,79.109283 
	C63.537415,73.280167 57.264622,66.960876 50.434196,60.079819 
	C44.063641,67.079758 38.140011,73.588615 32.016991,80.316566 
	C28.055962,76.019623 24.818548,72.507660 21.510754,68.919350 
	C27.318670,63.166145 33.584225,56.959621 39.865547,50.737476 
	C33.430298,44.405499 27.076199,38.153366 20.588795,31.770067 
	C24.625883,28.301355 28.220554,25.212774 31.908028,22.044456 
	C37.821526,28.313696 43.713398,34.560005 49.671597,40.876640 
	C56.763542,33.717220 62.968498,27.453232 69.429047,20.931213 
	C72.033760,23.547804 74.549171,26.074684 77.342865,28.842991 
z"
/> 
</Svg>
)

export const threeLine = ({ className }) => ( 
    <Svg viewBox="0 0 24 24" className={className} >   
 <path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="currentColor"/>
<path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor"/>
<path d="M3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H3Z" fill="currentColor"/> 
</Svg>
)

export const betterX = ({ className }) => ( 
    <Svg viewBox="0 0 20.00 20.00" className={className} >
			<path fill="currentColor"  d="M16.293 17.707a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293z"></path>
	</Svg>
)

export const DownPointer = ({ className}) => (
	<svg width="99px" height="99px" className={className} viewBox="0 0 24 24" fill="#currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffffCCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="F-Chevron"> <polyline fill="none" id="Down" points="5 8.5 12 15.5 19 8.5" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> </g> </g> </g></svg>
)

