import React from 'react'
import QrReader from 'react-qr-reader';

class PunchForm extends React.Component {
    
    handleScan = (data) => {
        if (data) {
          console.log(data)
        }
      }
    handleError = (err) => {
        console.error(err)
    }

    render(){
    const { onRouteChange } = this.props;
    return(
        <div>
            <QrReader
                className = 'center'
                delay={200}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '500px' }}
            />
            <div className='fw6 lh-copy f3' >
                <label className="db">Place: Home</label>
                <label className="db">Time: 12:00:00 PM</label>
                <label className="db">User: Mikan</label>
                <label className="db">Date: 03/10/2019</label>
                <label className="db">{`In/Out: ${this.props.in_out}`}</label>
            </div>
            <div className="lh-copy mt3 center">
                <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Punch"
                    onClick={() => onRouteChange('punchrecipt')}
                />
            </div>
        </div>    
    )
    }
}

export default PunchForm;