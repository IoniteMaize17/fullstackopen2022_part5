export const Notification = (props) => {
  const styles = {
    notification_box: {
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  }

  return props.messages !== null ? (
    <div className={`notification${props.type === 'e' ? 'Red' : 'Green'}`} style={{
      ...styles.notification_box,
      color: props.type === 'e' ? 'red' : 'green'
    }}>
      {props.messages}
    </div>
  ) : null
}