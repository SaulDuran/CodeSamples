/**
 * Created by goat on 2015-08-25.
 */
var dispatcher = {

    getInput : function(type){

        var QuestionInput;
        switch ( type ){
            case 'text':
                QuestionInput = require('../../inputs/text/text.jsx');
                break;
            case 'textarea':
                QuestionInput = require('../../inputs/textarea/textarea.jsx');
                break;
            case 'email':
                QuestionInput = require('../../inputs/email/email.jsx');
                break;
            case 'number':
                QuestionInput = require('../../inputs/number/number.jsx');
                break;
            case 'password':
                QuestionInput = require('../../inputs/password/password.jsx');
                break;
            case 'heading':
                QuestionInput = require('../../inputs/heading/heading.jsx');
                break;
            case 'radio':
                QuestionInput = require('../../inputs/radio/radio.jsx');
                break;
            case 'checkbox':
                QuestionInput = require('../../inputs/checkbox/checkbox.jsx');
                break;
            case 'dropdown':
                QuestionInput = require('../../inputs/dropdown/dropdown.jsx');
                break;
            case 'date':
                QuestionInput = require('../../inputs/date/date.jsx');
                break;
            case 'combobox':
                QuestionInput = require('../../inputs/combobox/combobox.jsx');
                break;
            case 'maskedField':
                QuestionInput = require('../../inputs/maskedField/maskedField.jsx');
                break;
            case 'UploadPhoto':
                QuestionInput = require('../../inputs/uploadPhoto/uploadPhoto.jsx');
                break;
            case 'SelectAvatar':
                QuestionInput = require('../../inputs/selectAvatar/selectAvatar.jsx');
                break;
            case 'likert':
                QuestionInput = require('../../inputs/likert/likert.jsx');
                break;
            case 'agreement':
                QuestionInput = require('../../inputs/agreement/agreement.jsx');
                break;
            default:
                QuestionInput = require('../../inputs/text/text.jsx');
        }

        return QuestionInput;
    }
};

module.exports = dispatcher;