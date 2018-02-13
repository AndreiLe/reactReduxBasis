import React from 'react'
import PropTypes from 'prop-types'

function DumpComponent({data}) {
  return (
  	<div >
  		{data}
  	</div>
    )
}

DumpComponent.propTypes = {
  data: PropTypes.string
}

DumpComponent.defaultProps = {
  data: 'default data'
}

export default DumpComponent