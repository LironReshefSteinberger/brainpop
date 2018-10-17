
import axios from 'axios';
import UtilService from './UtilService.js'

var DATA_KEY = 'data';

var CURR_STATE_KEY = 'currState';

var currState = {
    schoolClass: '',
    filterBy: {
        name: ''
    },
    sortBy: {
        columnName: '',
        isAsc: false,
    }
};

function saveCurrState(schoolClass, filterBy, sortBy) {
    if (schoolClass) {
        currState.schoolClass = schoolClass;
    } else if (filterBy) {
        currState.filterBy = filterBy;
    } else if (sortBy) {
        currState.sortBy = sortBy;
    }
    UtilService.saveToStorage(CURR_STATE_KEY, currState);
}

function saveStudents(students) {
    var currData = UtilService.loadFromStorage(DATA_KEY);
    //get the specific object from 'currData' from localStorage, then update its' students key
    var dataToUpdate = currData.find(item => item.id === currState.schoolClass.id);
    dataToUpdate.students = students;
    var dataToUpdateIdx = currData.findIndex(item => item.id === currState.schoolClass.id);
    currData.splice(dataToUpdateIdx, 1, dataToUpdate);
    UtilService.saveToStorage(DATA_KEY, currData);
}

// return currState - if exists, if not - return null
function getCurrState() {
    var currState = UtilService.loadFromStorage(CURR_STATE_KEY);
    if (currState) return currState;
    else return null;
}

function getStudents(schoolClass) {
    var schoolClassId = schoolClass.id;
    var currData = UtilService.loadFromStorage(DATA_KEY) || [];
    if (currData && currData.length !== 0) {
        var oneItem = currData.filter(item => item.id === schoolClass.id);
    }
    if (!currData || currData.length === 0 || oneItem.length === 0) {
        // console.log('load students from server!!!!');
        return axios.get(`https://qa.brainpop.com/devtest/api/classes/${schoolClassId}/students`)
            .then(res => {
                // console.log('load students from server!!');
                var newData = {id: schoolClass.id, name: schoolClass.name, students: res.data};
                currData.push(newData);
                UtilService.saveToStorage(DATA_KEY, currData);
                return res.data;
            })
            .catch(err => console.log('Problem gettind data from API', err))
    }
    // console.log('load students from localstorage!!!!');
    var students = oneItem[0].students;
    return Promise.resolve(students);
}

function getStudentInfoById(studentId) {
    return axios.get(`https://qa.brainpop.com/devtest/api/students/${studentId}`)
    .then(res => {
        return res.data;
    })
    .catch(err => console.log('Problem gettind data from API', err))
}

export default {
    getStudents,
    getStudentInfoById,
    saveCurrState,
    getCurrState,
    saveStudents
}