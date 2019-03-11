import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f7fc'
	},
	imageContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 260,
		height: 240
	},
	subtitle: {
		color: 'black',
		marginTop: 10,
		width: 160,
		textAlign: 'center',
		opacity: 0.9
	},
	containerForm: {
		padding: 20,
		backgroundColor: 'white'
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(0, 0, 0,0.2)',
		marginBottom: 10,
		color: 'black',
		paddingHorizontal: 10
	},
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 10
	},
	buttonTxt: {
		textAlign: 'center',
		color: '#FFFFFF'
	},
	buttonAlertContainer: {
		backgroundColor: 'red',
		paddingVertical: 10,
		marginBottom: 10
	},
	buttonSuccessContainer: {
		backgroundColor: 'green',
		paddingVertical: 10,
		marginBottom: 10
	}
});

export default styles