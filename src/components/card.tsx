
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

interface cardItem{
    title:string,
    description?:string,
    image?:string,
    path:string
}
interface Cardsprops{
    card:cardItem
}

function Cards({card}:Cardsprops) {
    const navigate=useNavigate();
    const words=card.title.split("");
    const length=words.length;
    const descriptionwords=card.description?.split(" ")||[];
  return (
    <Card style={{ width: '18rem' }} onClick={()=>{navigate(card.path)}} className='DashBoard-card'>
      <Card.Img variant="top" src={card.image} style={{height:"300px",width:"100%",objectFit:"cover",}}/>
      <Card.Body style={{textAlign:"center",borderTop:"1px solid black"}}>
        <Card.Title className='oswald-CardText'><span style={{color:"#003333"}}>{words.slice(0,2)}</span> 
        <span style={{color:"#FF6A00"}}>{words.slice(2,length)}</span>
        </Card.Title>
        <Card.Text className='oswald-CardText'>
        <span style={{color:"#003333"}}>{descriptionwords.slice(0,2).join(" ")}</span> 
        <span style={{color:"#FF6A00"}}>{" "}{descriptionwords.slice(2,length).join(" ")}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;