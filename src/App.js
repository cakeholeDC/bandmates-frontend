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

		if (token) {
			fetch('http://localhost:3000/profile',{
				method: "GET",
				headers: {
					"Authentication": token
				}
			})
			.then(res => res.json())
			.then(user => this.setState({
				currentUser: user,
				loading: false
			}))
		} else {
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
				this.setState({
					currentUser: JSON.parse(apiResponse.currentUser)
				})
			})
	}

	logOutUser = () => {
		this.setState({ currentUser: null })
		localStorage.removeItem('token')
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
		    bands={this.state.bands}
		    musicians={this.state.musicians}
	      	isLoading={ this.state.loading }
	      	currentUser={this.state.currentUser}
      	/>
	    </div>
	  );
	}
}

export default App;
