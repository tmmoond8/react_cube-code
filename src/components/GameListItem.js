/**
 * Created by tmmoon on 17. 11. 7.
 */
import React, {Component} from 'react';

class GameListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectIndex !== this.state.selectIndex) {
            this.setState({ selectIndex: nextProps.selectIndex });
        }
    };

    getStyle = () => {
        return {
            backgroundColor: this.props.index === this.state.selectIndex ? 'grey' : 'transparent'
        }
    };

    render() {
        return (
            <li onClick={this.props.onClick} style={this.getStyle()}>
                {this.props.collectAnswer}
            </li>
        )
    }
}

export default GameListItem;