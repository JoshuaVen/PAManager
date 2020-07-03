import React from 'react'

class List extends React.Component {
    render() {
        return (
            <ul>
                {this.props.animes.map((animeTitle, index) => <li key={index}>{animeTitle}</li>)}
            </ul>
        )
    }
}

export default List;
