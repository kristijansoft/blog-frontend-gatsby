import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

class MailchimpComponent extends React.Component {
    state = {
        // name: null,
        email: null,
    }

    _handleChange = e => {
        // console.log({
        //     [`${e.target.name}`]: e.target.value,
        // })
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()

        // console.log('submit', this.state)

        // addToMailchimp(this.state.email, this.state)
        addToMailchimp(this.state.email)
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`)

                if (result !== 'success') {
                    throw msg
                }
                alert(msg)
            })
            .catch(err => {
                console.log('err', err)
                alert(err)
            })
    }

    render() {
        return (
            <div className="sans-serif">
                <h2 className="font-bold mb-1">Sign up for the BSR Newsletter</h2>
                <div>
                    <p className="mb-4">Get an overview of our latest news, along with fascinating images and people. Sent about once a month.</p>
                    <form onSubmit={this._handleSubmit} className="bg-gray-100 text-gray-600 flex items-center py-2 px-4 pr-2 border focus-within:border-blue-600">
                        {/* <input
                            type="text"
                            onChange={this._handleChange}
                            placeholder="name"
                            name="name"
                        /> */}
                        <input
                            type="email"
                            onChange={this._handleChange}
                            placeholder="Email address"
                            name="email"
                            className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none mr-2"
                        />
                        <input type="submit" className="inline-block px-4 py-2 leading-none text-white flex-shrink-0 cursor-pointer bg-blue-600" value="Subscribe" />
                    </form>
                </div>
            </div>
        )
    }
}

export default MailchimpComponent;

// class MailchimpComponent extends React.Component {
//   // Since `addToMailchimp` returns a promise, you
//   // can handle the response in two different ways:

//   // Note that you need to send an email & optionally, listFields
//   // these values can be pulled from React state, form fields,
//   // or wherever.  (Personally, I recommend storing in state).

//   // 1. via `.then`
//   _handleSubmit = e => {
//     e.preventDefault();
//     // addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
//     addToMailchimp(email) 
//     .then(data => {
//       // I recommend setting data to React state
//       // but you can do whatever you want (including ignoring this `then()` altogether)
//       console.log(data)
//     })
//     .catch(() => {
//       // unnecessary because Mailchimp only ever
//       // returns a 200 status code
//       // see below for how to handle errors
//     })
//   }

//   // 2. via `async/await`
//   _handleSubmit = async (e) => {
//     e.preventDefault();
//     // const result = await addToMailchimp(email, listFields)
//     const result = await addToMailchimp(email)
//     // I recommend setting `result` to React state
//     // but you can do whatever you want
//   }

//   render () {
//     return (
//       // <form onSubmit={this._handleSubmit(email, {listFields})}>
//       <form onSubmit={this._handleSubmit(email)}>

//       </form>
//     )
//   }
// }

// export default MailchimpComponent;