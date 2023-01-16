import React, {Component} from "react";
import '../style/element.css';

class Element extends Component{

    render() {
        return (
            <div className="card cardContainer" title={this.props.nome} style={{
                    width: '8rem',
                    backgroundColor: '#212529',
                    alignItems: 'center',
                    margin: 'auto',
                    marginTop: '1%',
                    marginBottom: '1%'
                }}
                 onClick={() => this.props.onClick(this.props.element)}
            >
                <img className="card-img-top" style={{margin: 'auto'}} alt='channel' src={this.props.img}/>
                <div className="card-body">
                    <p className="card-text lead text-truncate textCss">{this.props.nome}</p>
                </div>
            </div>
        );
    }

}

export default Element;