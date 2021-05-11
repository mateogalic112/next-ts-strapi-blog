import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
	interface Palette {
		neutral: Palette['primary'];
	}
	interface PaletteOptions {
		neutral: PaletteOptions['primary'];
	}
}

const theme = createMuiTheme({
	palette: {
		primary: indigo,
		secondary: pink,
		neutral: {
			main: '#FBF4EB', // Paper color
		},
	},
});

export default theme;
