/**
 * Created by moonti on 2017. 10. 23..
 */
import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.color = this.props.boardColor;
        this.COLOR_MAP = {
            '0' : 'none',
            '1' : 'Black',
            '2' : 'FireBrick',
            '3' : 'Yellow',
            '4' : 'YellowGreen',
            '5' : 'DarkTurquoise',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }

    getStyle = () => {
        return { background: this.COLOR_MAP[this.state.value]}
    };

    handleClick = () => {
        if (!this.props.onClick) return;
        this.props.onClick(this.props.row, this.props.idx);
        this.setState({
            value: !this.state.value
        });
    };

    render() {
        return (
            <div onClick={this.handleClick} className="Square-square" style={this.getStyle()}></div>
        )
    }
}

export default Square;