import {Injectable} from '@angular/core';
import {User} from "../../shared/models/users";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users$: Subject<User[]> = new Subject<User[]>();
  emailError$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  phoneError$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getUsers(): void {
    const users = localStorage.getItem('users');
    if (users) {
      this.users$.next(JSON.parse(users))
    }
  }

  public getUser(id: number): User | null {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users).find((user: User) => {
        return user.id === id
      })
    }
    return null;
  }

  public addUser(user: User): boolean {
    const usersStr = localStorage.getItem('users');
    if (usersStr && usersStr !== '[]') {
      const users: User[] = JSON.parse(usersStr);
      if (this.isUnique(users, user)) {
        users.push({...user, id: users[users.length - 1].id + 1});
        localStorage.setItem('users', JSON.stringify(users));
        this.users$.next(users);
        return true;
      }
    } else {
      localStorage.setItem('users', JSON.stringify([{...user, id: 1}]));
      this.users$.next([{...user, id: 1}]);
      return true;
    }
    return false;
  }

  public editUser(user: User): boolean {
    const users = localStorage.getItem('users');
    if (users) {
      const parsedUsers: User[] = JSON.parse(users)
      const editedUsers = parsedUsers.map((prevUser: User) => {
        if (prevUser.id === user.id) {
          return user;
        }
        return prevUser;
      })
      if (this.isUnique(parsedUsers.filter(_user => _user.id !== user.id), user)) {
        localStorage.setItem('users', JSON.stringify(editedUsers));
        this.users$.next(editedUsers);
        return true;
      }
    }
    return false;
  }

  public removeUser(id: number): void {
    const users = localStorage.getItem('users');
    if (users) {
      const editedUsers = JSON.parse(users).filter((user: User) => user.id !== id)
      localStorage.setItem('users', JSON.stringify(editedUsers));
      this.users$.next(editedUsers);
    }
  }

  private isUnique(users: User[], newUser: User): boolean {
    let isEmailUnique: boolean = true;
    let isPhoneUnique: boolean = true;
    users.forEach(user => {
      if (user.email === newUser.email) {
        isEmailUnique = false;
        this.emailError$.next('notUnique');
      }
      if (user.phone === newUser.phone) {
        isPhoneUnique = false;
        this.phoneError$.next('notUnique');
      }
    });
    return isEmailUnique && isPhoneUnique;
  }
}
