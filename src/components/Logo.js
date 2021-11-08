import '../App.css'

export default function Logo() {
    return (
        <div className='logo'>
            <img src={process.env.PUBLIC_URL + '/v_logo.png'} alt="logo"></img>
            <p className='marker'> + Liam Armstrong</p>
        </div>
    )
}