package lt.techin.ovidijus.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.dto.FollowerResponseDTO;
import lt.techin.ovidijus.back.dto.UserResponseDTO;
import lt.techin.ovidijus.back.service.FollowerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class FollowerController {

    private final FollowerService followerService;

    @PostMapping("api/follower/{IdWho}/{IdWhat}")
    public ResponseEntity<?> createFollower(@PathVariable Long IdWho, @PathVariable Long IdWhat){
        return ResponseEntity.status(HttpStatus.CREATED).body(followerService.createFollower(IdWho, IdWhat));
    }

    @GetMapping("api/follower/{IdWho}/{IdWhat}")
    public ResponseEntity<?> isFollowing(@PathVariable Long IdWho, @PathVariable Long IdWhat) {
        return ResponseEntity.ok(followerService.isFollowing(IdWho, IdWhat));
    }

    @DeleteMapping("api/follower/{IdWho}/{IdWhat}")
    public void deleteFollower(@PathVariable Long IdWho, @PathVariable Long IdWhat){
        followerService.deleteFollower(IdWho, IdWhat);
    }

    @GetMapping("api/follower/{IdWho}")
    public List<FollowerResponseDTO> isFollowing(@PathVariable Long IdWho) {
        return followerService.isFollowingByIdWho(IdWho);
    }

}
