import { OAuth2Client } from 'google-auth-library'

const keys = JSON.parse(import.meta.env.GOOGLE_AUTH_CREDS)

const oAuth2Client = new OAuth2Client({
	clientId: keys.web.client_id,
	clientSecret: keys.web.client_secret,
	redirectUri: 'http://localhost:3000/oauth2callback',
})

export function googleSignIn() {
	return new Promise((resolve, reject) => {
		try {
			const authUrl = oAuth2Client.generateAuthUrl({
				access_type: 'online',
				scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
			})

			fetch(authUrl)
		} catch (err) {
			console.error(err)
		}
	})
}
