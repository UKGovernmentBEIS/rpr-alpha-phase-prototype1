import React from "react"

export default function useGdsScripts(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            if(window) {
                window['GOVUKFrontend'].initAll()
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}