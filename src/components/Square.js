/**
 * Created by moonti on 2017. 10. 23..
 */
import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value === "0" ? false : true
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.getValue(nextProps.value) !== this.getValue(this.state.value)) {
            this.setState({ value: nextProps.value });
        }
    }

    getValue = (originValue) => {
        return originValue === "0" || originValue === false ? false : true;
    };

    getStyle = () => {
        return { background: this.getValue(this.state.value) ? 'black' : 'none'}
    };

    handleClick = () => {
        this.props.onClick(this.props.row, this.props.idx);
        this.setState({
            value: !this.state.value
        });
    };

    render() {
        return (
            <div onClick={this.handleClick} className="square" style={this.getStyle()}></div>
        )
    }
}

export default Square;