import TileRendition from './TileRendition'
import { Loader } from 'ps-solution-library-ui-common/ui/components';

class EmployeeData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Employee Directory",
            employees: [],
            statusMessage: 'Getting employee data...',
            statusSubmessage: ''
        };
    }    

    concludeApi(userDb) {
        var validUsers = []
        var title = ""
        var department = ""
        var email = ""
        var phonenumber = ""

        userDb.forEach((user) => {
          if (user.jive) {
            if (user.jive.profile) {
              user.jive.profile.forEach((field) => {
                if (field.jive_label.toLowerCase() == "title" && field.value) {
                    title=field.value
                }
                else if (field.jive_label.toLowerCase() == "department" && field.value) {
                    department = field.value
                }
              })
            }
          }
          if (user.emails) {
            user.emails.forEach((field) => {
                if (field.jive_label.toLowerCase() == "email" && field.value) {
                    email=field.value
                }
            })
          }
          if (user.phoneNumbers) {
            user.phoneNumbers.forEach((field) => {
                if (field.jive_label.toLowerCase() == "phone number" && field.value) {
                    phonenumber=field.value
                }
            })
          } 
          if(user.jive.enabled === true)
          {
            validUsers.push({
                id: user.id,
                fullName: user.name.formatted,
                avatar: user.resources.avatar,
                email: email,
                title: title,
                department: department,
                phone:phonenumber
            })
        }
        })
    
        
        this.setState({employees: validUsers});
        this.setState({statusMessage: ''});
    }

    getAllUsers(nextRequest, previousRequestList) {
        let getAllUsers = this.getAllUsers.bind(this)
        let concludeApi = this.concludeApi.bind(this)
        var allUsers = previousRequestList || [];

        var nextLink = nextRequest || '/people/?fields=name,emails,jive,resources.avatar,phoneNumbers&count=100';
        var param = {
        v: 'v3',
        href: nextLink
        }
        osapi.jive.core.get(param).execute(function (userList) {
        var tempEvents = userList.content.list
        allUsers = allUsers.concat(tempEvents);
        if (userList.content.links) {
            if (userList.content.links.next) {
            var splitLink = userList.content.links.next.split('v3');
            getAllUsers(splitLink[1], allUsers);
            }
        }
        else {
            concludeApi(allUsers)
        }
        })
    }

    componentDidMount() {
        this.getAllUsers()                  
    }
    
    render() {
        var optionalLoader = this.state.statusMessage.includes("...") ? <Loader element /> : '';

        {this.state.statusMessage.length > 0 ? <div class="sp-loading-message"><div>{this.state.statusMessage}</div>{optionalLoader}<div>{this.state.statusSubmessage}</div></div> : ''}
        {
            if (this.state.statusMessage.length == 0){
                return <TileRendition employees={this.state.employees} config={this.props.config} />}
            else{
                return <Loader element />
            }
        }
    }
}

export default EmployeeData