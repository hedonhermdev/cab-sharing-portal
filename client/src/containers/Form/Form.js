import React, { Component } from "react";
import "./Navbar";
import classes from "./Form.module.css";
import Navbar from "./Navbar";
import Input from "../../components/UI/Input/Input";
import {updateObject} from "../../shared/utility"
//import Spinner from "../../components/UI/Spinner/Spinner"
class Form extends Component {
  state = {
    form: {
        source: {
            elementType: 'input',
            label: 'Source',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        destination: {
            elementType: 'input',
            label: 'Destination',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dateOfJourney: {
            elementType: 'input',
            label: 'Date Of Journey',
            elementConfig: {
                type: 'date',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        startingTime: {
            elementType: 'input',
            label: 'Select Time Window(Starting Time)',
            elementConfig: {
                type: 'time',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        endingTime: {
            elementType: 'input',
            label: 'Select Time Window(Ending Time)',
            elementConfig: {
                type: 'time',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true,
                isBigger: true
            },
            valid: false,
            touched: false
        },
        phoneNumber: {
            elementType: 'input',
            label: 'Phone No.(10 Digit)',
            elementConfig: {
                type: 'tel',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
                isNumeric: false

            },
            valid: false,
            touched: false
        },
    },
    formIsValid: false
}

formSubmitHandler = ( event ) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.form) {
        formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
    }
    

    // Sample Data : an object (for sending dagta to backend)
    // {
    //     source: 'Jaipur',
    //     destination: 'Delhi',
    //     dataOfJourney: '01-01-2001',
    //     startingTime: '12:36'
    //     EndingTime: '18:23',
    //     phoneNumber: '9969696969'
    // }

    // Make The post request here 

    
}

inputChangedHandler = (event, inputIdentifier) => {
        
    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.form[inputIdentifier].validation),
        touched: true
    });
    const updatedForm = updateObject(this.state.form, {
        [inputIdentifier]: updatedFormElement
    });
    
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({form: updatedForm, formIsValid: formIsValid});
}

checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.isBigger) {
        const endTime = this.state.form.endingTime.value
        const startTime = this.state.form.startingTime.value
        isValid = ( endTime > startTime ) && isValid
    }

    return isValid;
}

  render() {
    
    const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        let detailsForm = (
            <form onSubmit={this.formSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        label = {formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
            </form>
        )
    return (
      <div>
        <Navbar onSubmit = {this.formSubmitHandler} disabled={!this.state.formIsValid}/>
        <div className = {classes.flexContainer}>
          <div>
            <img
              className={classes.banner}
              src="https://ik.imagekit.io/m52sq26n4h/taxi.jpg"
            />
          </div>
          <form className={classes.formFields}>
            {detailsForm}
          </form>
        </div>
        
      </div>
    );
  }
}
export default Form;
