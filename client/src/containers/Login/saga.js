export default class AuthenticationService {
  constructor(props) {
    this.apiUrl = 'https://discordapp.com/api'
  }

  async getRequest(path) {
    let url = this.apiUrl + path
    let response = await fetch(url, {method: 'GET'})
    return await response.json()
  }
  async postRequest(path, data={}) {
    let url = this.apiUrl + path
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return await response.json()
  }

  async login(username, password) {
    return await this.postRequest('/v6/login')
  }

}
