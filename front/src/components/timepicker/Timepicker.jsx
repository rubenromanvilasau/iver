import PropTypes from 'prop-types';

export const Timepicker = ({ timeRef }) => {

    return (
        <input
            ref={ timeRef }
            type="time"
            name="time"
            id="time"
            className='border bg-gray-50 border-gray-300 p-2 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 text-sm p-2.5 rounded-lg'
            required
        />

    )
};

Timepicker.propTypes = {
    timeRef: PropTypes.object.isRequired,
};


