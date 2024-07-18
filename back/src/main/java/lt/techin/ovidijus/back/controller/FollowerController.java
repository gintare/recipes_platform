package lt.techin.ovidijus.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.service.FollowerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
