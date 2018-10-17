

import axios from 'axios'
import UtilService from './UtilService.js'


var SCHOOL_CLASSES_KEY = 'schoolClasses';
var SCHOOL_CLASS_KEY = 'schoolClass';


function setSchoolClass(schoolClassName) {
    UtilService.saveToStorage(SCHOOL_CLASS_KEY, schoolClassName);
}

function getSchoolClasses() {
    var schoolClasses = UtilService.loadFromStorage(SCHOOL_CLASSES_KEY);
    if (!schoolClasses || schoolClasses.length === 0) {
        return axios.get(`https://qa.brainpop.com/devtest/api/classes`)
            .then(res => {
                UtilService.saveToStorage(SCHOOL_CLASSES_KEY, res.data);
                return res.data;
            })
            .catch(err => err)
    }
    return Promise.resolve(schoolClasses);
}
    

export default {
    getSchoolClasses,
    setSchoolClass,
}