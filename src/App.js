import './style/App.css';
import CaricaFile from './components/caricaFile';
import Regola from './components/regola';
import Intro from "./components/intro";
import React, {Component} from "react";

class App extends Component {
    handleShow(where) {
        let regola = document.getElementById("regola");
        let file = document.getElementById("file");
        let intro = document.getElementById("intro");

        if (where === 'regola') {
            regola.style.display = '';
            file.style.display = 'none';
            intro.style.display = 'none';
        }
        if (where === 'file') {
            regola.style.display = 'none';
            file.style.display = '';
            intro.style.display = 'none';
        }
        if (where === 'intro') {
            regola.style.display = 'none';
            file.style.display = 'none';
            intro.style.display = '';
        }
    }

    componentDidMount() {
        let regola = document.getElementById("regola");
        let file = document.getElementById("file");
        let intro = document.getElementById("intro");

        const queryParams = new URLSearchParams(window.location.search);
        if(queryParams != '') {
            regola.style.display = '';
            file.style.display = 'none';
            intro.style.display = 'none';
        }
        else {
            regola.style.display = 'none';
            file.style.display = 'none';
            intro.style.display = '';
        }
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className='nav-link active' href="#" onClick = {() => this.handleShow('intro')}>IFTTT</a>
                                <a className='nav-link active' href="#" onClick = {() => this.handleShow('regola')}>Crea una regola</a>
                                <a className='nav-link active' href="#" onClick = {() => this.handleShow('file')}>Carica un file di regole</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div id='intro' style={{display: ''}}>
                    <Intro style={{position: 'fixed'}}/>
                </div>
                <div id='regola' style={{display: 'none'}}>
                    <Regola/>
                </div>
                <div id='file' style={{display: 'none'}}>
                    <CaricaFile/>
                </div>
            </>
        );
    }
}

export default App;
