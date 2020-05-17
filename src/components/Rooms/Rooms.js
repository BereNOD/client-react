import React, { Component } from 'react';
import Maps  from '../MapComponents/Maps';
import HotelSlider from './HotelSlider';
import { Container, Button, Icon, Image, Item, Statistic, List, Segment, Rating} from 'semantic-ui-react';
import Moreinfo from './Moreinfo';

export default class Rooms extends Component {

 constructor() {
        super();

        this.state = {
          error: null,
            isLoaded: false,
            'hotels': []
        }
    }

    componentDidMount() {
      this.getHotels();
    }

    getHotels() {
      const id = this.props.match.params.id;
      fetch('http://localhost:8000/api/hotel/'+ id)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                   isLoaded: true, 
                   hotels: result
                 });
            },
            (error) => {
              this.setState({
                   isLoaded: true, 
                   error
                 });
            }
        )
    }

   render() {
 
    const { error, isLoaded, hotels } = this.state;

    if (error) {
      return <p> Error {error.message} </p>
    } else if (!isLoaded){
      return <p> </p>

    } else {
      return (
       <Container  style={{width: '930px' }}> 
       <Item.Group divided style={{ maxWidth: '930px' }}>
      
        <HotelSlider name={hotels.name} raiting={hotels.raiting}/>
              
        <Maps lat={hotels.lat} lng={hotels.lng}/>

        <Segment style={{borderRadius:'0px'}}>
         <Item.Group divided>      

           <Item>
                <Item.Image src='data:image/jpeg;base64,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' />
                <Item.Content>
                  <Statistic size='tiny' floated='right'>
                      <Statistic.Value>1300 <span className='price'>грн</span></Statistic.Value>
                      <Statistic.Label>за 1 ніч</Statistic.Label>
                  </Statistic>

                  <Item.Header as='a'>Напівлюкс</Item.Header>
      
                  <List>
                      <List.Item><Icon color='grey' name='bed'/> Двоспальне ліжко</List.Item>
                      <List.Item><Icon color='grey' name='rss'/> Безкоштовний wi-fi</List.Item>
                      <List.Item><Icon color='grey' name='food'/> Сніданок включений</List.Item>
                      <List.Item><Icon color='grey' name='info'/> Безкоштовне скасування бронювання</List.Item>
                  </List>    
                 
            
                    <Button color='brown' floated='right'>
                        Забронювати <Icon name='right chevron' />
                    </Button>
                

              </Item.Content>
          </Item>
          <Moreinfo />
           </Item.Group>
      </Segment>
        
      </Item.Group>
        
      </Container>
      ) 
    }
  }
}