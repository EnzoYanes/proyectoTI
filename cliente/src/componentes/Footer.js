import React, {Component} from 'react';

class Footer extends Component{

render(){
    return(
        <div style={{position:'relative', top:'350px', bottom:'0px', width:'100%'}}>         
            <footer className="page-footer" style={{height: '10vh'}}>
                <div class="container">
                <div class="footer-copyright">
                    <div class="container">
                    © 2018 Copyright
                    <a class="grey-text text-lighten-4 right" >Todos los derechos reservados</a>
                    </div>
                </div>
                </div>
            </footer>
        </div>
        );
    }
}

export default Footer;