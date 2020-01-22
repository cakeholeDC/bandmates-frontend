import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

const BANDS_URL = 'http://localhost:3000/bands'
const MUSICIANS_URL = 'http://localhost:3000/musicians'

class App extends React.Component {
	state={
		bands: [],
		musicians: [],
		currentUser: null,
		currentBand: null,
		loading: true
	}


	componentDidMount(){
		fetch(BANDS_URL)
			.then(res => res.json())
			.then(bands => this.setState({ bands }))

		fetch(MUSICIANS_URL)
			.then(res => res.json())
			.then(musicians  => this.setState({ musicians }))

		let token = localStorage.getItem('token')

		console.log(token)
		console.log("localStorage =>", localStorage)

		if (token) {
			console.log("Token Found... logging in...")

			//////
			//FOR DEBUGGING => token => JWT.encode({ musician_id: 1 }, Rails.application.secrets.secret_key_base, 'HS512')
			// encode method is broken.
			token = "eyJhbGciOiJIUzUxMiJ9.eyJtdXNpY2lhbl9pZCI6MX0.URNETVMd2MWA7Qu2Tadc2-sMzc1pZTpGKMa56V72FMBhVM-ABvKYmvjSCbtcjIBQb2Eu_yJbb3_MZJOzuJOYgw"
			localStorage.setItem('token', token)
			console.log("re-setting for debugging localStorage[token] =>", token)
			//////

			fetch('http://localhost:3000/profile',{
				method: "GET",
				headers: {
					"Authentication": token
				}
			})
			.then(res => res.json())
			.then(user => {
				console.log("token user => ", user)
				this.setState({
					currentUser: user,
					loading: false
				})
			})
		} else {
			console.log("Token Not Found... Log In will be required...")
			this.setState({ loading: false })
		}
	}

	processNewUserForm = (data) => {
		const newUserConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		}
		fetch('http://localhost:3000/musicians', newUserConfig)
			.then(res => res.json())
			.then(apiResponse => {
				localStorage.setItem("token", apiResponse.token)
				console.log("setting localStorage[token] =>", apiResponse.token)

				//////
				//FOR DEBUGGING => token => JWT.encode({ musician_id: 1 }, Rails.application.secrets.secret_key_base, 'HS512')
				// encode method is broken.
				let token = "eyJhbGciOiJIUzUxMiJ9.eyJtdXNpY2lhbl9pZCI6MX0.URNETVMd2MWA7Qu2Tadc2-sMzc1pZTpGKMa56V72FMBhVM-ABvKYmvjSCbtcjIBQb2Eu_yJbb3_MZJOzuJOYgw"
				localStorage.setItem('token', token)
				console.log("re-setting for debugging localStorage[token] =>", token)
				//////

				this.setState({
					currentUser: JSON.parse(apiResponse.currentUser),
					musicians: [...this.state.musicians, JSON.parse(apiResponse.currentUser)]
				})
			})
	}

	processLoginForm = (data) => {
		const userConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		}
		fetch('http://localhost:3000/api/v1/login', userConfig)
			.then(res => res.json())
			.then(apiResponse => {
				localStorage.setItem("token", apiResponse.token)
				console.log("setting localStorage[token] =>", apiResponse.token)

				//////
				//FOR DEBUGGING => token => JWT.encode({ musician_id: 1 }, Rails.application.secrets.secret_key_base, 'HS512')
				// encode method is broken.
				let token = "eyJhbGciOiJIUzUxMiJ9.eyJtdXNpY2lhbl9pZCI6MX0.URNETVMd2MWA7Qu2Tadc2-sMzc1pZTpGKMa56V72FMBhVM-ABvKYmvjSCbtcjIBQb2Eu_yJbb3_MZJOzuJOYgw"
				localStorage.setItem('token', token)
				console.log("re-setting for debugging localStorage[token] =>", token)
				//////

				this.setState({
					currentUser: JSON.parse(apiResponse.currentUser)
				})
			})
	}

	logOutUser = () => {
		this.setState({ currentUser: null })
		localStorage.removeItem('token')
	}

	processNewBandForm = (data) => {
		console.log('processing', data)
		const newBandConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch(BANDS_URL, newBandConfig)
			.then(response => response.json())
			.then(band => {
				console.log("processNewBand => ", band)
				this.setState({
					bands: [...this.state.bands, band]
				})
			})
	}

	processEditBandForm = (data) => {
		console.log('processing edit =>', data)
		
		const editBandConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch(BANDS_URL, editBandConfig)
			.then(response => response.json())
			.then(band => {
				console.log("processEditBand => ", band)
				this.setState({
					bands: [...this.state.bands.filter(oldBand => oldBand.id !== band.id), band]
				})
			})
	} 

	render(){
	  return (
	    <div className="App">
	      <NavBar
	      	processLoginForm={ this.processLoginForm }
	      	processNewUserForm={ this.processNewUserForm }
	      	logOutUser={ this.logOutUser }
	      	currentUser={this.state.currentUser}
	      />
	      <MainContainer
		    bands={ this.state.bands }
		    processNewBandForm={ this.processNewBandForm }
		    processEditBandForm={ this.processEditBandForm }
		    musicians={ this.state.musicians }
	      	isLoading={ this.state.loading }
	      	currentUser={ this.state.currentUser }
	      	currentBand={ this.state.currentBand }
      	/>
	    </div>
	  );
	}
}

export default App;
