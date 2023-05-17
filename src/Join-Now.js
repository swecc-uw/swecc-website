import React from 'react';
import './App.css';
import './Join-now.css';

const Join = () => {
  return (
    <div class="join">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
        `}
      </style>
      <div class="join-section">
        <div class="info-message-section">
            <div class="info-table">
            <table>
                <tbody>
                <tr>
                    <td align="center">
                        <img src="networking.png" alt="Networking Picture" width="60%"/>
                    </td>
                    <td  align="center">
                        <img src="community.png" alt="Community Picture"  width="60%"/>
                    </td>
                    <td align="center">
                        <img src="career.png" alt="Career Picture"  width="60%"/>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div class="info-title">networking</div>
                    </td>
                    <td>
                    <div class="info-title">community</div>
                    </td>
                    <td>
                    <div class="info-title">career</div>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div class="info-text">make connections in a network of future and current software engineers  </div>
                    </td>
                    <td>
                    <div class="info-text">Join a vibrant community of future software engineers</div>
                    </td>
                    <td>
                    <div class="info-text">Gain access to career talks, and more opportunities</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <br></br>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Join;
