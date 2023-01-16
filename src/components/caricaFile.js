import React, {Component} from "react";
import Block from "./block";
import {Button, Form} from "react-bootstrap";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCRlasczxKfa99gC1l_UveeZH3bU4oejXk",
    authDomain: "tiroci.firebaseapp.com",
    databaseURL: "https://tiroci-default-rtdb.firebaseio.com",
    projectId: "tiroci",
    storageBucket: "tiroci.appspot.com",
    messagingSenderId: "91494209728",
    appId: "1:91494209728:web:a6786994640d8395fd7525"
};

firebase.initializeApp(firebaseConfig);

let backupList = []
let list = []
let count = 0
const firebase_db = firebase.database().ref("/");

class CaricaFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            triggerFilter: '',
            actionFilter: '',
            cl0: false,
            cl1: false,
            cl2: false,
            cl3: false,
            filter: false,
            bool: ''
        }
    }

    componentDidMount() {
        document.getElementById('cerca').addEventListener('click', this.handleFilters)
        this.hideFilters()
        firebase_db.on('child_changed', snapshot => {
            let data = snapshot.val()
            if(data.end !== 'true') {
                if(this.state.filter === false) {
                    list.push(data);
                }
                else {
                    //C'è un filtro applicato
                    this.filter(data)
                }
                let temp = count + 1
                count = temp
                backupList.push(data)
                this.setState({recipes: list})
            }
            else
                this.hideSpinner()
        })
        window.addEventListener("beforeunload", e => {
            this.deleteDB()
        })
    }

    filter(data) {
        //Filtra ogni elemento che arriva
        if(this.checkTrigger(data.triggerName) && this.checkAction(data.actionName) && this.checkOptions(data))
            list.push(data)
    }

    checkTrigger(trigger) {
        if(this.state.triggerFilter === '')
            return true
        else
            return trigger.startsWith(this.state.triggerFilter)
    }

    checkAction(action) {
        if(this.state.actionFilter === '')
            return true
        else
            return action.startsWith(this.state.actionFilter)
    }

    checkOptions(data) {
        if(this.state.cl0 === false && this.state.cl1 === false && this.state.cl2 === false && this.state.cl3 === false)
            return true
        let cl0 = data.cl0
        let cl1 = data.cl1
        let cl2 = data.cl2
        let cl3 = data.cl3
        if(this.state.cl0 === true)
            if(cl0 > 50)
                return true
        if(this.state.cl1 === true)
            if(cl1 > 50)
                return true
        if(this.state.cl2 === true)
            if(cl2 > 50)
                return true
        if(this.state.cl3 === true)
            if(cl3 > 50)
                return true
        return false
    }

    hideFilters() {
        document.getElementById("filtriRegole").style.display = 'none'
    }

    showFilters() {
        document.getElementById("filtriRegole").style.display = ''
    }

    deleteDB() {
        firebase_db.child("/").remove().then(r => {});
        list = []
        backupList = []
        this.setState({recipes: list})
        count = 0
    }

    showSpinner() {
        document.getElementById('spinner').style.display = ''
    }

    hideSpinner() {
        document.getElementById('spinner').style.display = 'none'
    }

    voidSubmit() {
        if(document.getElementById('trig').value === '' && document.getElementById('act').value === '' && this.state.cl0 === false && this.state.cl1 === false && this.state.cl2 === false && this.state.cl3 === false)
            return false
        return true
    }

    handleFilters = () => {
        if(this.voidSubmit()) {
            this.setState({
                triggerFilter: document.getElementById('trig').value,
                actionFilter: document.getElementById('act').value,
                filter: true
            })
            list = []
            const db = firebase.database()
            const events = db.ref('/')
            const flag = this.state.cl0 || this.state.cl1 || this.state.cl2 || this.state.cl3

            //Caso in cui c'è il filtro sul trigger
            if (this.state.triggerFilter !== '' && this.state.actionFilter === '' && !flag) {
                const query = events.orderByChild('triggerName').startAt(this.state.triggerFilter).endAt(this.state.triggerFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end)
                                list.push(item.val())
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro sull'action
            if (this.state.actionFilter !== '' && this.state.triggerFilter === '' && !flag) {
                const query = events.orderByChild('actionName').startAt(this.state.actionFilter).endAt(this.state.actionFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end)
                                list.push(item.val())
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro su trigger e action
            if (this.state.actionFilter !== '' && this.state.triggerFilter !== '' && !flag) {
                const query = events.orderByChild('triggerName').startAt(this.state.triggerFilter).endAt(this.state.triggerFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end && item.val().actionName.startsWith(this.state.actionFilter))
                                list.push(item.val())
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro su class
            if (this.state.actionFilter === '' && this.state.triggerFilter === '' && flag) {
                let query = ''
                if (this.state.cl0)
                    query = events.orderByChild('cl0').startAt(50)
                else if (this.state.cl1)
                    query = events.orderByChild('cl1').startAt(50)
                else if (this.state.cl2)
                    query = events.orderByChild('cl2').startAt(50)
                else if (this.state.cl3)
                    query = events.orderByChild('cl3').startAt(50)
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end)
                                list.push(item.val())
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro su trigger e class
            if (this.state.actionFilter === '' && this.state.triggerFilter !== '' && flag) {
                const query = events.orderByChild('triggerName').startAt(this.state.triggerFilter).endAt(this.state.triggerFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end) {
                                if (this.state.cl0) {
                                    if (item.val().cl0 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl1) {
                                    if (item.val().cl1 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl2) {
                                    if (item.val().cl2 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl3) {
                                    if (item.val().cl3 > 50)
                                        list.push(item.val())
                                }
                            }
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro su action e class
            if (this.state.actionFilter !== '' && this.state.triggerFilter === '' && flag) {
                const query = events.orderByChild('actionName').startAt(this.state.actionFilter).endAt(this.state.actionFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end) {
                                if (this.state.cl0) {
                                    if (item.val().cl0 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl1) {
                                    if (item.val().cl1 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl2) {
                                    if (item.val().cl2 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl3) {
                                    if (item.val().cl3 > 50)
                                        list.push(item.val())
                                }
                            }
                        })
                    }
                }).then(r => {
                })
            }

            //Caso in cui c'è il filtro su trigger, action e class
            if (this.state.actionFilter !== '' && this.state.triggerFilter !== '' && flag) {
                const query = events.orderByChild('triggerName').startAt(this.state.triggerFilter).endAt(this.state.triggerFilter + '\uf8ff')
                query.once('value', snapshot => {
                    if (snapshot.exists()) {
                        snapshot.forEach(item => {
                            if (!item.val().end && item.val().actionName.startsWith(this.state.actionFilter)) {
                                if (this.state.cl0) {
                                    if (item.val().cl0 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl1) {
                                    if (item.val().cl1 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl2) {
                                    if (item.val().cl2 > 50)
                                        list.push(item.val())
                                } else if (this.state.cl3) {
                                    if (item.val().cl3 > 50)
                                        list.push(item.val())
                                }
                            }
                        })
                    }
                }).then(r => {
                })
            }

            this.setState({recipes: list})
        }
    }

    deleteFilters() {
        this.setState({
            triggerFilter: '',
            actionFilter: '',
            cl0: false,
            cl1: false,
            cl2: false,
            cl3: false,
            filter: false
        })
        document.getElementById("gridRadios1").checked = false
        document.getElementById("gridRadios2").checked = false
        document.getElementById("gridRadios3").checked = false
        document.getElementById("gridRadios4").checked = false
        document.getElementById("trig").placeholder = "TriggerChannelTitle"
        document.getElementById("trig").value = ""
        document.getElementById("act").placeholder = "ActionChannelTitle"
        document.getElementById("act").value = ""
        //Prende tutti i dati dal database finora aggiunti
        list = []
        list = backupList
        this.setState({recipes: ['ok']})
    }

    render() {
        return (
            <>
                <div id='filtriRegole' className='container ' style={{position: 'fixed', top: '25%', width: '15%', verticalAlign: 'middle', paddingTop: '1%', paddingBottom: '1%', marginLeft: '0.2%', }}>
                    <h4 className='lead' style={{textAlign: 'center'}}><strong>{count} regole
                        processate</strong></h4>
                    <div className="card-header">
                        <strong>Filtri</strong>
                    </div>
                    <ul className="list-group list-group-flush" style={{marginTop: '1%'}}>
                        <div>
                            <div className="form-group row" style={{paddingLeft: '1%'}}>
                                <span>TriggerChannelTitle</span>
                                <div className="col-sm-10">
                                    <input type="text" id='trig' className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row" style={{marginTop: '1%', paddingLeft: '1%'}}>
                                <span>ActionChannelTitle</span>
                                <div className="col-sm-10">
                                    <input type="text" id='act' className="form-control"/>
                                </div>
                            </div>
                            <fieldset className="form-group" style={{marginTop: '1%', paddingLeft: '1%'}}>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="gridRadios"
                                                   id="gridRadios1" value="option1" onClick={() => {
                                                this.setState({cl0: true, cl1: false, cl2: false, cl3: false})
                                            }}/>
                                            <label className="form-check-label" htmlFor="gridRadios1">
                                                Harmless
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="gridRadios"
                                                   id="gridRadios2" value="option2" onClick={() => {
                                                this.setState({cl0: false, cl1: true, cl2: false, cl3: false})
                                            }}/>
                                            <label className="form-check-label" htmlFor="gridRadios2">
                                                Personal attack
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="gridRadios"
                                                   id="gridRadios3" value="option3" onClick={() => {
                                                this.setState({cl0: false, cl1: false, cl2: true, cl3: false})
                                            }}/>
                                            <label className="form-check-label" htmlFor="gridRadios3">
                                                Physical attack
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="gridRadios"
                                                   id="gridRadios4" value="option4" onClick={() => {
                                                this.setState({cl0: false, cl1: false, cl2: false, cl3: true})
                                            }}/>
                                            <label className="form-check-label" htmlFor="gridRadios4">
                                                Cybersecurity attack
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div style={{display: 'inline-block'}}>
                                <div className="col-sm-10">
                                    <button id='cerca' className="btn btn-secondary">Cerca</button>
                                </div>
                            </div>
                            <div className="form-group row" style={{display: 'inline-block', paddingLeft: '2%'}}>
                                <div className="col-sm-10">
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        this.deleteFilters()
                                        this.setState({recipes: list})
                                    }}>Elimina</button>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

                <div id='section2' className="container my-3">
                    <h1>Carica un file</h1>
                    <p className="lead">Carica un file JSON qui sotto per verificare la sicurezza delle tue regole.</p>

                    <form action="http://dfe3-35-229-189-194.ngrok.io//predict-all" method="post"
                          enctype='multipart/form-data'>
                        <input className="form-control form-control-lg" id="formFileLg" type="file" name='file'
                               onChange={() => {
                                   this.deleteDB()
                                   this.hideFilters()
                               }}
                               accept=".json"
                        />
                        <Button style={{marginTop: '1%'}} variant="primary" type="submit" onClick={() => {
                            this.showSpinner()
                            this.deleteFilters()
                            this.showFilters()
                        }}>
                            Submit
                        </Button>
                    </form>

                    <div id='result' className='container'>
                        {list.map(info => (
                            <Block
                                title={info.title}
                                description={info.desc}
                                triggerChannelTitle={info.triggerName}
                                triggerTitle={info.triggerTitle}
                                actionChannelTitle={info.actionName}
                                actionTitle={info.actionTitle}
                                class0={info.cl0}
                                class1={info.cl1}
                                class2={info.cl2}
                                class3={info.cl3}
                            />
                        ))}
                    </div>

                    <div id='spinner' className='text-center' style={{display: 'none'}}>
                        <div className="spinner-grow m-5" style={{width: '3rem', height: '3rem'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CaricaFile;