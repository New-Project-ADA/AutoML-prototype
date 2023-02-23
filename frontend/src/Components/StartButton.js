import { ReactComponent as Loader } from './loader.svg'

const CustomButton = ({ onSubmit, text, loading = false, disabled }) => {
  return (
    <button className="submit-btn" onClick={onSubmit} disabled={disabled}>
      {!loading ? text : <Loader className="spinner" />}
    </button>
  )
}

export default CustomButton