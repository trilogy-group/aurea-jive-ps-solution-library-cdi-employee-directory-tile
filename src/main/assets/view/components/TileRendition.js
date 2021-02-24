import { MdContactMail, MdContactPhone } from 'react-icons/md';
class Header extends React.Component {
    render () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
}

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {searchKey: ""};
      }
    
    searchHandler(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    }
    render () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" value={this.state.symbol} onChange={this.searchHandler.bind(this)}/>
            </div>

        );
    }
}

class EmployeeListItem extends React.Component {
    render () {
        var contactdetails = ""
        if(this.props.employee.phone != "")
        {
            contactdetails = <a href={"tel:" + this.props.employee.phone} >
            <div className="media-body tel">
            <MdContactPhone /><span>  </span>{this.props.employee.phone}
            </div>
        </a>
        }  
        return (
            <li className="table-view-cell media">
                <img className="media-object small pull-left" src={this.props.employee.avatar.ref}/>
                    {this.props.employee.fullName}
                    <p>{this.props.employee.title}</p>
                <a href={"mailto:" + this.props.employee.work_email} >                    
                    <div className="media-body mail">
                    <MdContactMail /><span>  </span>{this.props.employee.email}
                    </div>
                </a>
                {contactdetails}                
            </li>           
        );
    }
}

class EmployeeList extends React.Component {  
    render () {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );        
    }
}

class HomePage extends React.Component {
    render () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Employee Directory" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        )
    }
}

class TileRendition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey:'',
            employees: this.props.employees
        }
    }

    findById (id) {
        var deferred = $.Deferred();
        var employee = null;
        var l = employees.length;
        for (var i = 0; i < l; i++) {
            if (employees[i].eecode == id) {
                employee = employees[i];
                break;
            }
        }
        deferred.resolve(employee);
        return deferred.promise();
    }
    
    findByName (searchKey) {
        var deferred = $.Deferred();
        var results = this.props.employees.filter(function (element) {
            var fullName = element.fullName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }

    searchHandler(searchKey) {
        this.findByName(searchKey).done(function(employees) {
            this.setState({
                searchKey:searchKey,
                employees: employees,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.searchKey} employees={this.props.employees}/>]});
        }.bind(this));
    }

    componentDidMount () {
    }

    render() {
        return <HomePage key="list" searchHandler={this.searchHandler.bind(this)} searchKey={this.state.searchKey} employees={this.state.employees} config={this.props.config}  />
    }
}

export default TileRendition