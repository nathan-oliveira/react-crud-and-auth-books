import React from 'react'
import './image.scss'

const Image = ({ alt, ...props }: any) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad() {
    setSkeleton(false);
  }

  return (
    <React.Fragment>
      {skeleton && <div className="skeleton"></div>}
      <img onLoad={handleLoad} className={`${skeleton ? 'img' : 'imgs'}`} alt={alt} {...props} />
    </React.Fragment>
  )
}

export default Image
