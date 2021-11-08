import '../App.css'

export default function CameraListItem({camera, handleHover, handleClick}) {
    const [id] = camera

    return (
        <div 
            className='camera-list-item' 
            key={id}
            onMouseEnter={(e) => {e.stopPropagation(); handleHover(id, true)}}
            onMouseLeave={(e) => {e.stopPropagation(); handleHover(id, false)}}
            onClick={(e) => {e.stopPropagation(); handleClick(id)}}
        >
            <p style={{'fontSize': '9px'}}>{id}</p>
        </div>
    )
}