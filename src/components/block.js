import {Component} from "react";
import '../style/block.css';
import success from "./../images/success.png";
import warning from "./../images/warning.png";

class Block extends Component {

    percentage0() {
        return {
            width: this.props.class0 + "%"
        }
    }

    percentage1() {
        return {
            width: this.props.class1 + "%"
        }
    }

    percentage2() {
        return {
            width: this.props.class2 + "%"
        }
    }

    percentage3() {
        return {
            width: this.props.class3 + "%"
        }
    }

    color(where) {
        if(where === 'class0')
            if(this.props.class0 < 30)
                return "progress-bar bg-danger"
            else if (this.props.class0 < 50)
                return "progress-bar bg-warning"
            else
                return "progress-bar bg-success"
        if(where === 'class1')
            if(this.props.class1 < 30)
                return "progress-bar bg-danger"
            else if (this.props.class1 < 50)
                return "progress-bar bg-warning"
            else
                return "progress-bar bg-success"
        if(where === 'class2')
            if(this.props.class2 < 30)
                return "progress-bar bg-danger"
            else if (this.props.class2 < 50)
                return "progress-bar bg-warning"
            else
                return "progress-bar bg-success"
        if(where === 'class3')
            if(this.props.class3 < 30)
                return "progress-bar bg-danger"
            else if (this.props.class3 < 50)
                return "progress-bar bg-warning"
            else
                return "progress-bar bg-success"
    }

    picture() {
        if(this.props.class0 > this.props.class1 && this.props.class0 > this.props.class2 && this.props.class0 > this.props.class3)
            return success;
        return warning;
    }

    render() {
        return (
            <div className='container blockRules'>
                <div className="row">
                    <div className="col-1" style={{margin: 'auto'}}>
                        <img style={{width: "100%"}} src={this.picture()} alt={this.picture()}/>
                    </div>
                    <div className="col-6">
                        <ul><b>Nome</b></ul>
                        <ul>{this.props.title}</ul>
                        <ul><b>Descrizione</b></ul>
                        <ul>{this.props.description}</ul>
                        <ul>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <b>TriggerChannelTitle</b>
                                    </div>
                                    <div className="col">
                                        {this.props.triggerChannelTitle}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <b>TriggerTitle</b>
                                    </div>
                                    <div className="col">
                                        {this.props.triggerTitle}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <b>ActionChannelTitle</b>
                                    </div>
                                    <div className="col">
                                        {this.props.actionChannelTitle}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <b>ActionTitle</b>
                                    </div>
                                    <div className="col">
                                        {this.props.actionTitle}
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>

                    <div className="col-3" style={{margin: 'auto'}}>
                        <ul>
                            <b>Harmless: </b>
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-10">
                                    <div className="progress">
                                        <div
                                            className={this.color('class0')}
                                            role="progressbar" style={this.percentage0()}
                                            aria-valuenow={this.props.class0} aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <small className='text-center' style={{verticalAlign: 'middle'}}>{this.props.class0}%</small>
                                </div>
                            </div>


                        </ul>
                        <ul>
                            <b>Personal Attack: </b>
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-10">
                                    <div className="progress">
                                        <div
                                            className={this.color('class1')}
                                            role="progressbar" style={this.percentage1()}
                                            aria-valuenow={this.props.class1} aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <small className='text-center' style={{verticalAlign: 'middle'}}>{this.props.class1}%</small>
                                </div>
                            </div>
                        </ul>
                        <ul>
                            <b>Physical Attack: </b>
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-10">
                                    <div className="progress">
                                        <div
                                            className={this.color('class2')}
                                            role="progressbar" style={this.percentage2()}
                                            aria-valuenow={this.props.class2} aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <small className='text-center' style={{verticalAlign: 'middle'}}>{this.props.class2}%</small>
                                </div>
                            </div>
                        </ul>
                        <ul>
                            <b>Cybersecurity Attack: </b>
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-10">
                                    <div className="progress">
                                        <div
                                            className={this.color('class3')}
                                            role="progressbar" style={this.percentage3()}
                                            aria-valuenow={this.props.class3} aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <small className='text-center' style={{verticalAlign: 'middle'}}>{this.props.class3}%</small>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Block;