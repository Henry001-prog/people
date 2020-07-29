import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import PeopleList from '../components/PeopleList';

import axios from 'axios';

export default class PeoplePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peoples: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.search();
    /*setTimeout(() => {
      axios
        .get('https://randomuser.me/api/?nat=br&results=15')
        .then(response => {
          const { results } = response.data;
          this.setState({
            peoples: results,
            loading: false,
          });
        }).catch(error => {
            this.setState({
              loading: false,
              error: true,
            })
        });
    }, 1500)*/
  }

  async search() {
    try {
      const response = await axios.get('https://randomuser.me/api/?nat=br&results=15');
      const { results } = response.data;
          this.setState({
            peoples: results,
            loading: false,
          })
      } catch (error) {
          this.setState({
            loading: false,
            error: true,
          })
      };
  }

  /// renderPage() {
  //   if (this.state.loading) {
  //       return <ActivityIndicator size='large' color='#6ca2f7' />;
  //   } 
  //    
  //   if (this.state.error) {
  //       return <Text style={styles.error}>Ops... Algo deu errado =(</Text>;
  //   }
  //   
  //   return (
  //      <PeopleList 
  //            peoples={this.state.peoples} 
  //            onPressItem={pageParams => {
  //              this.props.navigation.navigate('PeopleDetail', pageParams);
  //            }} />
  //   );
  // }

  render() {
      //this.props.navigation.navigate('PeopleDetail');
      return (
        <View style={styles.container}>
          {/* this.renderPage() */}
          {
            this.state.loading
                ? <ActivityIndicator size='large' color='#6ca2f7' />
                : this.state.error
                    ? <Text style={styles.error}>Ops... Algo deu errado =(</Text>
                    : <PeopleList 
                        peoples={this.state.peoples} 
                        onPressItem={pageParams => {
                          this.props.navigation.navigate('PeopleDetail', pageParams);
                        }} />
          }
          
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  error: {
     color: 'red',
     alignSelf: 'center',
     fontSize: 18,
  },
});