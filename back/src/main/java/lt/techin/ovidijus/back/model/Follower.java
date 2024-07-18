package lt.techin.ovidijus.back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "follower")
@Getter
@Setter
@NoArgsConstructor
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "follow_who")
    private User followWho;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "follow_what")
    private User followWhat;
}
