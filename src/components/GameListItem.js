/**
 * Created by tmmoon on 17. 11. 7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

GameListItem.propTypes = {
    selectIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    collectAnswer: PropTypes.string.isRequired
}

export default GameListItem;