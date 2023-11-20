import React, { useState } from 'react';
import feeData from './FeeData.json';
const feeStructure = feeData;

const CourseFeeCalculator = () => {
    const [selectedFee, setSelectedFee] = useState(null);
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleFeeChange = (fee) => {
        setSelectedFee(fee);
        setSelectedNationality(null);
        setSelectedCourse(null);
        setSelectedLevel(null);
    };

    const handleNationalityChange = (nationality) => {
        setSelectedNationality(nationality);
        setSelectedCourse(null);
        setSelectedLevel(null);
    };

    const handleCourseChange = (course) => {
        setSelectedCourse(course);
        setSelectedLevel(null);
    };

    const handleLevelChange = (level) => {
        setSelectedLevel(level);
    };

    const calculateFee = () => {
        if (selectedFee && selectedNationality && selectedCourse && selectedLevel) {
            return feeStructure[selectedFee][selectedNationality][selectedCourse][selectedLevel].amount;
        }
        return null;
    };

    return (
        <div className={"container"}>
            <label>Select Fee:</label>
            <select onChange={(e) => handleFeeChange(e.target.value)}>
                <option value={null}>Select</option>
                {Object.keys(feeStructure).map((fee) => (
                    <option key={fee} value={fee}>
                        {fee}
                    </option>
                ))}
            </select>

            {selectedFee && (
                <div>
                    <label>Select Nationality:</label>
                    <select onChange={(e) => handleNationalityChange(e.target.value)}>
                        <option value={null}>Select</option>
                        {Object.keys(feeStructure[selectedFee]).map((nationality) => (
                            <option key={nationality} value={nationality}>
                                {nationality}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedNationality && (
                <div>
                    <label>Select Course:</label>
                    <select onChange={(e) => handleCourseChange(e.target.value)}>
                        <option value={null}>Select</option>
                        {Object.keys(feeStructure[selectedFee][selectedNationality]).map((course) => (
                            <option key={course} value={course}>
                                {course === 'ALL_COURSES' ? 'Medical, Dental, Ayurveda' : course}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCourse && (
                <div>
                    <label>Select Level:</label>
                    <select onChange={(e) => handleLevelChange(e.target.value)}>
                        <option value={null}>Select</option>
                        {Object.keys(feeStructure[selectedFee][selectedNationality][selectedCourse]).map((level) => (
                            <option key={level} value={level}>
                                {level === 'ALL_LEVEL' ? 'UG, PG, DIPLOMA, Ph.D' : level}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedLevel && (
                <div>
                    <p className={"totalFee"}>Fee Amount: {calculateFee() || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default CourseFeeCalculator;
