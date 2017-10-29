/**
 * Created by moonti on 2017. 10. 23..
 */
import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
        this.color = '';
        if(this.props.boardKey === "main") {
            this.color = 'black';
        } else {
            this.color = this.props.boardKey;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }

    getStyle = () => {
        return { background: this.state.value ? this.color : 'none'}
    };

    handleClick = () => {
        if (this.props.boardKey !== "main") return;
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