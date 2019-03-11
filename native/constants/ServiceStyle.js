import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f8f7fc',
		flex: 1
	},
	serviceLine: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	twitterCard: {
		backgroundColor: 'rgb(0, 171, 236)',
		width: 100,
		height: 100
	},
	facebookCard: {
		backgroundColor: 'rgb(59, 87, 157)',
		width: 100,
		height: 100
	},
	outlookCard: {
		width: 100,
		height: 100
	},
	instagramCard: {
		backgroundColor: 'red',
		width: 100,
		height: 100
	},
	trelloCard: {
		width: 100,
		height: 100,
		backgroundColor: '#3C5DC3'
	},
	spotifyCard: {
		width: 100,
		height: 100,
		backgroundColor: '#00F252'
	},
	title: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 30,
		marginTop: 100,
		textAlign: 'center'
	},
	logout: {
		textAlign: 'center',
		marginBottom: 10,
		fontWeight: 'bold',
		color: 'black',
		fontSize: 15
	}
})

export default styles;