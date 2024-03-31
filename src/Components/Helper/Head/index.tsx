import React from 'react'

const Head = (props: any) => {
  React.useEffect(() => {
    document.title = `${props.title} | Sistema`
    document.querySelector("meta[name='description']")?.setAttribute('content', props.description || 'Sistema')
  }, [props])

  return (
    <React.Fragment>
    </React.Fragment>
  )
}

export default Head;
