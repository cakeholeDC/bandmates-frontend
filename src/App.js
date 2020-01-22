import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

const BANDS_URL = 'http://localhost:3000/bands'
const MUSICIANS_URL = 'http://localhost:3000/musicians'
const MEMBERS_URL = 'http://localhost:3000/band_memberships'


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

		let token = localStorage.getItem("token")

		if (token) {
			fetch('http://localhost:3000/profile', {
				method: "GET",
				headers: {
					"Authentication": token
				}
			})
			.then(res => res.json())
			.then(user => {
				this.setState({
					currentUser: user,
					loading: false
				})
			})
		} else {
			this.setState({ loading: false })
		}
	}

	processNewUserForm = (data) => {
		const newUserConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(data)
		}
		fetch('http://localhost:3000/musicians', newUserConfig)
			.then(res => res.json())
			.then(createdMusician => {
				localStorage.setItem("token", createdMusician.jwt)
				this.setState({
					currentUser: JSON.parse(createdMusician.currentUser),
					musicians: [...this.state.musicians, JSON.parse(createdMusician.currentUser)]
				})
			})
	}

	processLoginForm = (data) => {
		const userConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(data)
		}
		fetch('http://localhost:3000/api/v1/login', userConfig)
			.then(res => res.json())
			.then(apiResponse => {
				if (!apiResponse.error) {
					console.log(apiResponse.jwt)
					localStorage.setItem("token", apiResponse.jwt)
				this.setState({
					currentUser: JSON.parse(apiResponse.currentUser)
				})} else {
					alert(apiResponse.message)
				}
			})
	}

	setCurrentBand = (currentBand) => {
		this.setState({ currentBand })
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
			method: "PATCH",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		}

		fetch(`${BANDS_URL}/${data.id}`, editBandConfig)
			.then(response => response.json())
			.then(band => {
				console.log("processEditBand => ", band)
				this.setState({
					bands: [...this.state.bands.filter(oldBand => oldBand.id !== band.id), band]
				})
			})
	}

	processNewMemberForm = (data) => {
		console.log("newMember=>", data)
		fetch(MEMBERS_URL, {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accepts" : "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(band => {
			console.log("processNewMemberForm => ", band)
			this.setState({
				bands: [...this.state.bands.filter(oldBand => oldBand.id !== band.id), band]
			})
		})
	}

	handleOnJoinBand = (member) => {
		let musicianID = this.state.currentUser.id

		const memberConfig = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify({
				musician_id: musicianID
			})
		}

		fetch(`${MEMBERS_URL}/${member.id}`, memberConfig)
			.then(res => res.json())
			.then(updatedBand => {
				this.setState({
					bands: [...this.state.bands.filter(oldBand => oldBand.id !== updatedBand.id), updatedBand]
				})
			})
			.catch(error => console.warn(error.message))

	}

	handleLeaveBand = (member) => {

		const memberConfig = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify({
				musician_id: null
			})
		}

		fetch(`${MEMBERS_URL}/${member.id}`, memberConfig)
			.then(res => res.json())
			.then(updatedBand => {
				this.setState({
					bands: [...this.state.bands.filter(oldBand => oldBand.id !== updatedBand.id), updatedBand]
				})
			})
			.catch(error => console.warn(error.message))

	}

	processDeleteBand = (data) => {
		let okToDelete = window.confirm("Easy there, Yoko. Are you sure you want to do that?")

		if (okToDelete) {
			console.log('processDeleteBand=>',data)
			fetch(`${BANDS_URL}/${data.id}`, {
				method: "DELETE",
				headers: {
					'Content-Type': "application/json",
					"Accepts" : "application/json"
				}
			})
			.then( this.setState({ 
					bands: [...this.state.bands.filter(oldBand => oldBand.id !== data.id)]
				})
			)
		}
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
		    handleOnJoinBand={ this.handleOnJoinBand }
		    handleLeaveBand= {this.handleLeaveBand }
		    processNewBandForm={ this.processNewBandForm }
		    processEditBandForm={ this.processEditBandForm }
		    processDeleteBand={ this.processDeleteBand }
		    processNewMemberForm={ this.processNewMemberForm }
		    musicians={ this.state.musicians }
	      	isLoading={ this.state.loading }
	      	currentUser={ this.state.currentUser }
	      	setCurrentBand={ this.setCurrentBand }
	      	currentBand={ this.state.currentBand }
      	/>
	    </div>
	  );
	}
}

export default App;
