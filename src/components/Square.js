/**
 * Created by moonti on 2017. 10. 23..
 */
import React from 'react';

class Square extends React.Component {
    render() {
        let style = {
            background: this.props.isMark ? 'black' : 'none'
        }

        return (
            <div className="square" style={style}></div>
        )
    }
}

export default Square;