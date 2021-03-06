// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

import { Notification } from './notification.model';
import { EmitterService } from './emitter.service';
import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  static readonly NOTIFICATION_ID = 'NOTIFICATION';

  constructor(private _notificationsService: NotificationsService) { }

  public init = () => {
    // Listen to the 'notification' emitted event so as populate the model with the event payload
    EmitterService
        .get(NotificationService.NOTIFICATION_ID)
        .subscribe( (notif: Notification) => this.showNotif(notif) );
  }

  /**
   * Success message
   * @param title Title
   * @param message Message
   */
  public success = (title: string, message: string): void => {
      // Setting up the notification to send
      const notif: Notification = {
        type: 'success',
        title: title,
        message: message
      };

      // Notify app component to show the notification
      EmitterService.get(NotificationService.NOTIFICATION_ID).emit(notif);
  }

  /**
   * Warn message
   * @param title Title
   * @param message Message
   */
  public warn = (title: string, message: string): void => {
      // Setting up the notification to send
      const notif: Notification = {
        type: 'warn',
        title: title,
        message: message
      };

      // Notify app component to show the notification
      EmitterService.get(NotificationService.NOTIFICATION_ID).emit(notif);
  }

  /**
   * Error message
   * @param title Title
   * @param message Message
   */
  public error = (title: string, message: string): void => {
      // Setting up the notification to send
      const notif: Notification = {
        type: 'error',
        title: title,
        message: message
      };

      // Notify app component to show the notification
      EmitterService.get(NotificationService.NOTIFICATION_ID).emit(notif);
  }

  // Function to show notification depending on the type
  showNotif = (notif: Notification): void => {
    if (notif.type === 'success') {
      this._notificationsService.success(
        notif.title,
        notif.message
      );
    } else if (notif.type === 'error') {
      this._notificationsService.error(
        notif.title,
        notif.message,
        {
          timeOut: 0
        }
      );
    } else {
      this._notificationsService.warn(
        'Invalid',
        'Wrong notification type'
      );
    }
  }
}
