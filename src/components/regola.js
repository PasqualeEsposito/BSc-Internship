import React, {Component} from "react";
import Element from './element';
import './../style/regola.css';
import data from "./../data/channelList.json";
import trigger from "./../data/triggerList.json"
import action from "./../data/actionList.json"
import {Button, Modal, Form} from "react-bootstrap";
import plus from "./../images/plus.png"
import Block from "./block";

let recipeTemp = ""

let triggerList = []
let filteredTriggerList = []
let triggerName = ""
let triggerSelection = ""
let oldSelectedTrigger = {
    channelName: "Trigger",
    channelImgUrl: plus
}

let initialTrigger = {
    channelName: "Trigger",
    channelImgUrl: plus
}

let actionList = []
let filteredActionList = []
let actionName = ""
let actionSelection = ""
let oldSelectedAction = {
    channelName: "Action",
    channelImgUrl: plus
}

let initialAction = {
    channelName: "Action",
    channelImgUrl: plus
}

let temp = ''

class Regola extends Component {

    state = {
        cl0: '',
        cl1: '',
        cl2: '',
        cl3: '',
        dataCopyAction: [],
        dataCopyTrigger: [],
        show: false,
        show1: false,
        show2: false,
        title: '',
        description: '',
        class: false,
        classification: '',
        keywordTrigger: "",
        keywordAction: "",
        triggerChannelTitle: '',
        triggerTitle: '',
        actionChannelTitle: '',
        actionTitle: '',
        selectedTrigger: initialTrigger,
        selectedAction: initialAction,
        visibleTrig: false,
        visibleAct: false,
    };

    componentDidMount() {
        this.disableElimina()
        this.disableConferma()
        this.getTriggerChannels()
        this.getActionChannels()
        this.setState({dataCopyAction: filteredActionList})
        this.setState({dataCopyTrigger: filteredTriggerList})
        const queryParams = new URLSearchParams(window.location.search);
        const recipe = queryParams.get('recipe');
        const cl0 = queryParams.get('cl0');
        const cl1 = queryParams.get('cl1');
        const cl2 = queryParams.get('cl2');
        const cl3 = queryParams.get('cl3');
        const rec = queryParams.get('ist');

        if (rec) {
            const trigger = rec.split('. ')[0]
            const triggerTit = rec.split('. ')[1]
            const action = rec.split('. ')[2]
            const actionTit = rec.split('. ')[3]
            const title = rec.split('. ')[4]
            const description = rec.split('. ')[5]

            if (recipe) {
                this.setState({
                    class: true,
                    classification: temp,
                    cl0: cl0,
                    cl1: cl1,
                    cl2: cl2,
                    cl3: cl3,
                    triggerChannelTitle: trigger,
                    triggerTitle: triggerTit,
                    actionChannelTitle: action,
                    actionTitle: actionTit,
                    title: title,
                    description: description,
                    selectedTrigger: data.find(channel => {
                        if(channel.channelName === trigger)
                            return channel
                        return null
                    }),
                    selectedAction: data.find(channel => {
                        if(channel.channelName === action)
                            return channel
                        return null
                    })
                })
                this.enableElimina()
            }
        }
    }

    getTriggerChannels() {
        let triggerIdList = trigger.map(trig => {
            return trig.triggerChannelId
        })
        filteredTriggerList = data.map(elem => {
            for(let i = 0; i < triggerIdList.length; i++)
                if(triggerIdList[i] === elem.channelId)
                    return elem
        })
        filteredTriggerList = filteredTriggerList.filter(elem => {
            return elem !== undefined
        })
    }

    getActionChannels() {
        let actionIdList = action.map(act => {
            return act.actionChannelId
        })
        filteredActionList = data.map(elem => {
            for(let i = 0; i < actionIdList.length; i++)
                if(actionIdList[i] === elem.channelId)
                    return elem
        })
        filteredActionList = filteredActionList.filter(elem => {
            return elem !== undefined
        })
    }

    enableConferma() {
        document.getElementById('conferma').disabled = false
    }

    disableConferma() {
        document.getElementById('conferma').disabled = true
    }

    enableElimina() {
        document.getElementById('elimina').disabled = false
    }

    disableElimina() {
        document.getElementById('elimina').disabled = true
    }

    hideResult() {
        document.getElementById('result').style.display = 'none';
    }

    handleDisplay(where) {
        let triggers = document.getElementById("triggerChannels");
        let actions = document.getElementById("actionChannels");
        if (where === 'trigger') {
            if (triggers.style.display === 'none') {
                triggers.style.display = 'block';
                this.setState({visibleTrig: false});
            } else {
                triggers.style.display = 'none';
                this.setState({visibleTrig: true});
            }
            actions.style.display = 'none';
        } else {
            if (actions.style.display === 'none')
                actions.style.display = 'block';
            else
                actions.style.display = 'none';
            triggers.style.display = 'none';
        }
    }

    updateInputAction(keyword) {
        const filtered = filteredActionList.filter(channel => {
            return channel.channelName.toLowerCase().includes(keyword.toLowerCase())
        })
        this.setState({dataCopyAction: filtered});
    }

    updateInputTrigger(keyword) {
        const filtered = filteredTriggerList.filter(channel => {
            return channel.channelName.toLowerCase().includes(keyword.toLowerCase())
        })
        this.setState({dataCopyTrigger: filtered});
    }

    handleClickTrigger = trig => {
        this.setState({selectedTrigger: trig, keywordTrigger: "", dataCopyTrigger: filteredTriggerList, show: true});
        triggerName = trig.channelName;
        let id = trig.channelId;
        trigger.filter(t => {
            if (t.triggerChannelId === id) {
                triggerList.push(t.triggerTitle)
            }
        })
        this.handleShow();
    }

    handleClickAction = act => {
        this.setState({selectedAction: act, keywordAction: "", dataCopyAction: filteredActionList, show1: true});
        actionName = act.channelName;
        let id = act.channelId;
        action.filter(a => {
            if (a.actionChannelId === id) {
                actionList.push(a.actionTitle)
            }
        })
        this.handleShow1();
    }

    handleClose1 = () => {
        this.setState({show1: false, selectedAction: oldSelectedAction});
        actionList = [];
    }

    handleShow1 = () => this.setState({show1: true});

    handleClose2 = () => {
        this.setState({show2: false});
    }

    handleShow2 = () => this.setState({show2: true});

    handleClose = () => {
        this.setState({show: false, selectedTrigger: oldSelectedTrigger});
        triggerList = [];
    }

    handleShow = () => this.setState({show: true});

    render() {
        return (
            <>
                <div id='section1' className='container my-3'>
                    <h1>Crea una regola</h1>
                    <p className='lead'>Crea una regola e verificane la sicurezza. Clicca sui bottoni per creare la tua ricetta!</p>
                </div>
                <div className='container rule'>
                    <h1 className='text-secondary' style={{fontSize: '8em', cursor: 'default'}}>
                        if
                        <Button style={{marginLeft: '3%', marginRight: '3%'}} onClick={() => this.handleDisplay('trigger')}>
                            <p className='lead' style={{fontSize: '1em', display: 'block', textAlign: 'center', width: '100px', overflow: 'hidden', textOverflow:'ellipsis',  whiteSpace:'nowrap'}} title={this.state.selectedTrigger.channelName}><b>{this.state.selectedTrigger.channelName}</b></p>
                            <img style={{width: '80px'}} src={this.state.selectedTrigger.channelImgUrl} alt={this.state.selectedTrigger.channelName}/>
                            <p className='lead' style={{fontSize: '1em', display: 'block', textAlign: 'center', width: '100px', overflow: 'hidden', textOverflow:'ellipsis',  whiteSpace:'nowrap'}} title={triggerSelection}>{triggerSelection}</p>
                        </Button>
                        then
                        <Button style={{marginLeft: '3%', marginRight: '3%'}} onClick={() => this.handleDisplay('action')}>
                            <p className='lead' style={{fontSize: '1em', display: 'block', textAlign: 'center', width: '100px', overflow: 'hidden', textOverflow:'ellipsis',  whiteSpace:'nowrap'}} title={this.state.selectedAction.channelName}><b>{this.state.selectedAction.channelName}</b></p>
                            <img style={{width: '80px'}} src={this.state.selectedAction.channelImgUrl} alt={this.state.selectedAction.channelName}/>
                            <p className='lead' style={{fontSize: '1em', display: 'block', textAlign: 'center', width: '100px', overflow: 'hidden', textOverflow:'ellipsis',  whiteSpace:'nowrap'}} title={actionSelection}>{actionSelection}</p>
                        </Button>
                    </h1>
                    <Button id='conferma' className='btn-success' style={{marginTop: '5%'}}
                            onClick={() => {
                                if(triggerSelection !== "" && actionSelection !== "")
                                    this.handleShow2();
                            }}
                    >
                        Conferma
                    </Button>
                    <Button id='elimina' className='btn-danger' style={{marginTop: '5%', marginLeft: '2%'}}
                            onClick={() => {
                                this.setState({selectedTrigger: initialTrigger, selectedAction: initialAction});
                                triggerSelection = "";
                                actionSelection = "";
                                this.hideResult();
                                this.disableConferma()
                                this.disableElimina()
                            }}
                    >
                        Elimina
                    </Button>
                </div>

                <div id='triggerChannels'
                     className={this.state.visibleTrig ? 'container logos overflow-auto scrollBar animateOut' : 'container logos overflow-auto scrollBar animateIn'}>
                    <input
                        className='barStyling'
                        key="searchBar"
                        value={this.state.keywordTrigger}
                        placeholder={"Cerca trigger"}
                        onChange={(e) => {
                            this.setState({keywordTrigger: e.target.value});
                            this.updateInputTrigger(e.target.value)
                        }}
                    />
                    <div className='row'>
                        {this.state.dataCopyTrigger.map(info => (
                            <Element
                                nome={info.channelName}
                                img={info.channelImgUrl}
                                key={info.channelId}
                                element={info}
                                onClick={this.handleClickTrigger}
                            />
                        ))}
                    </div>
                </div>

                <div id='actionChannels'
                     className={this.state.visibleAct ? 'container logos overflow-auto scrollBar animateOut' : 'container logos overflow-auto scrollBar animateIn'}>
                    <input
                        className='barStyling'
                        key="searchBar"
                        value={this.state.keywordAction}
                        placeholder={"Cerca action"}
                        onChange={(e) => {
                            this.setState({keywordAction: e.target.value});
                            this.updateInputAction(e.target.value)
                        }}
                    />
                    <div className='row'>
                        {this.state.dataCopyAction.map(info => (
                            <Element
                                nome={info.channelName}
                                img={info.channelImgUrl}
                                key={info.channelId}
                                element={info}
                                onClick={this.handleClickAction}
                            />
                        ))}
                    </div>
                </div>
                <div id='result' className={this.state.cl0 !== '' && this.state.cl1 !== '' && this.state.cl2 !== '' && this.state.cl3 !== '' ? 'container showResult' : 'container hideResult'}>
                    <Block
                        title = {this.state.title}
                        description = {this.state.description}
                        triggerChannelTitle = {this.state.triggerChannelTitle}
                        triggerTitle = {this.state.triggerTitle}
                        actionChannelTitle = {this.state.actionChannelTitle}
                        actionTitle = {this.state.actionTitle}
                        class0 = {this.state.cl0.substring(0,5)}
                        class1 = {this.state.cl1.substring(0,5)}
                        class2 = {this.state.cl2.substring(0,5)}
                        class3 = {this.state.cl3.substring(0,5)}
                    />
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            <img className='modalImage' src={this.state.selectedTrigger.channelImgUrl} alt={this.state.selectedTrigger.channelName}/>
                            {"          " + this.state.selectedTrigger.channelName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            {triggerList.map(info => (
                                <button className='btn btn-secondary' type='button' key={info}
                                        onClick={() => {
                                            triggerSelection = info;
                                            triggerList = [];
                                            this.setState({show: false})
                                            oldSelectedTrigger = this.state.selectedTrigger
                                            document.getElementById("triggerChannels").style.display = 'none';
                                            this.enableElimina()
                                            if(actionSelection !== "") {
                                                this.handleShow2();
                                                this.enableConferma()
                                            }
                                        }}>
                                    {info}
                                </button>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show1} onHide={this.handleClose1}>
                    <Modal.Header>
                        <Modal.Title>
                            <img className='modalImage' src={this.state.selectedAction.channelImgUrl} alt={this.state.selectedAction.channelName}/>
                            {"          " + this.state.selectedAction.channelName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            {actionList.map(info => (
                                <button className='btn btn-secondary' type='button' key={info}
                                        onClick={() => {
                                            actionSelection = info;
                                            actionList = [];
                                            this.setState({show1: false})
                                            oldSelectedAction = this.state.selectedAction
                                            document.getElementById("actionChannels").style.display = 'none';
                                            this.enableElimina()
                                            if(triggerSelection !== "") {
                                                this.handleShow2();
                                                this.enableConferma()
                                            }
                                        }}>
                                    {info}
                                </button>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose1}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.show2} onHide={this.handleClose2}>
                    <Modal.Header>
                        <Modal.Title>
                            Nuova regola
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table table-borderless">
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td><b>TriggerChannelTitle:</b></td>
                                <td>{triggerName}</td>
                            </tr>
                            <tr>
                                <td><b>TriggerTitle:</b></td>
                                <td>{triggerSelection}</td>
                            </tr>
                            <tr>
                                <td><b>ActionChannelTitle:</b></td>
                                <td>{actionName}</td>
                            </tr>
                            <tr>
                                <td><b>ActionTitle:</b></td>
                                <td>{actionSelection}</td>
                            </tr>
                        </table>

                        <form action="http://dfe3-35-229-189-194.ngrok.io//predict" method="post">
                            <Form.Group controlId="Title">
                                <Form.Label>Inserisci il nome della regola:</Form.Label>
                                <Form.Control type="text" placeholder="Titolo" name="title"
                                              onChange={ (event) => {
                                                  this.setState({title:event.target.value})
                                              }
                                              }
                                              required
                                />
                            </Form.Group>

                            <Form.Group controlId="Description">
                                <Form.Label>Inserisci una descrizione:</Form.Label>
                                <Form.Control type="text" placeholder="Descrizione" name="description"
                                              onChange={ (event) => {
                                                  this.setState({description:event.target.value})
                                                }
                                              }
                                              required
                                />
                            </Form.Group>

                            <input type="text" name="recipe" value={recipeTemp} hidden></input>

                            <Button style={{marginTop: '3%'}} onClick = {() => {
                                recipeTemp = triggerName + ". " + triggerSelection + ". " + actionName + ". " + actionSelection + ". " + this.state.title + ". " + this.state.description
                                this.setState({recipe:recipeTemp})
                            } }
                                    variant="primary" type="submit">
                                Submit
                            </Button>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Regola;