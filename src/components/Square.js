/**
 * Created by moonti on 2017. 10. 23..
 */
import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <div className="square">{this.props.idx}</div>
        )
    }
}

export default Square;